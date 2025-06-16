using System.Collections.Generic;
using System.Linq;

namespace mdp.Model.Shared
{
    public abstract class IValueObject
    {
        protected abstract IEnumerable<object> GetAtomicValues();

        public override bool Equals(object obj)
        {
            if (obj is null) return false;

            var o = (IValueObject) obj;

            return Equals(o);
        }

        protected bool Equals(IValueObject other)
        {
            var objl = other.GetAtomicValues();
            var thisl = GetAtomicValues();

            var objEnum = objl.GetEnumerator();
            var thisEnum = thisl.GetEnumerator();

            var flag = true;
            while (objEnum.MoveNext() && thisEnum.MoveNext()) flag &= objEnum.Current == thisEnum.Current;

            return flag;
        }

        public override int GetHashCode()
        {
            return GetAtomicValues().GetHashCode();
        }

        public static bool operator ==(IValueObject left, IValueObject right)
        {
            return Equals(left, right);
        }

        public static bool operator !=(IValueObject left, IValueObject right)
        {
            return !Equals(left, right);
        }

        public override string ToString()
        {
            return GetAtomicValues().Aggregate("", (current, atomicValue) => current + atomicValue);
        }
    }
}